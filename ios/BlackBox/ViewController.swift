//
//  ViewController.swift
//  BlackBox
//
//  Created by Jack Flintermann on 2/20/19.
//  Copyright © 2019 Jack. All rights reserved.
//

import UIKit
import JavaScriptCore

class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, UITextFieldDelegate {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return JS.shared.state.messages.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = JS.shared.state.messages[indexPath.row]
        return cell
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        JS.shared.handleAction(Action.with {
            $0.type = Action.OneOf_Type.sendMessage(textField.text ?? "")
        })
        textField.text = ""
        return true
    }
    
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        JS.shared.addStateCallback { state in
            self.tableView.reloadData()
        }
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
    }


}

