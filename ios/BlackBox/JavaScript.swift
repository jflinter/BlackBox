//
//  JavaScript.swift
//  BlackBox
//
//  Created by Jack Flintermann on 2/20/19.
//  Copyright © 2019 Jack. All rights reserved.
//

import JavaScriptCore
import SwiftProtobuf

class JS {
    private let context = JSContext()!
    var state = State()
    static let shared = JS()
    
    init() {
        guard let mainPath = Bundle.main.path(forResource: "main", ofType: "js"),
            let mainSrc = try? String(contentsOfFile: mainPath, encoding: String.Encoding.utf8) else {
            fatalError("no js")
        }
        context.exceptionHandler = { c, value in
            let stacktrace = value!.objectForKeyedSubscript("stack").toString() ?? "?"
            let lineNumber = value!.objectForKeyedSubscript("line")?.toNumber() ?? -1
            let column = value!.objectForKeyedSubscript("column")?.toNumber() ?? -1
            let moreInfo = "in method: \(stacktrace) line: \(lineNumber):\(column)"
            print("JS ERROR: \(value?.toString() ?? "?") \(moreInfo)")
            print("bad")
        }
        
        context.evaluateScript("var console = { log: function(message) { _consoleLog(message) } }")
        let consoleLog: @convention(block) (String) -> Void = { message in
            print("console.log: " + message)
        }
        context.setObject(unsafeBitCast(consoleLog, to: AnyObject.self), forKeyedSubscript: "_consoleLog" as (NSCopying & NSObjectProtocol))
        
        context.evaluateScript(mainSrc)
        addStateCallback { (state) in
            self.state = state
        }
    }
    
    private func getHooksFunc(_ name: String) -> JSValue? {
        return self.context.objectForKeyedSubscript("blackBoxHooks").objectForKeyedSubscript(name)
    }
    
    func addStateCallback(_ callback: @escaping (State) -> ()) {
        let jsAddCallback = getHooksFunc("addStateCallback")!
        let block: @convention(block) (JSValue) -> () = { x in
            let data = BBArrayConverter.data(fromJSArray: x, in: self.context)
            let state = try! State(serializedData: data)
            callback(state)
        }
        let wrapped = JSValue(object: block, in: self.context)!
        jsAddCallback.call(withArguments: [wrapped])
        callback(self.state)
    }
    
    func handleAction(_ action: Action) {
        let data = try! action.serializedData()
        let jsObj = BBArrayConverter.value(from: data, in: self.context)
        getHooksFunc("handleAction")!.call(withArguments: [jsObj])
    }
}
