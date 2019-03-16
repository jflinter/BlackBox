//
//  BBArrayConverter.h
//  BlackBox
//
//  Created by Jack Flintermann on 2/24/19.
//  Copyright © 2019 Jack. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
NS_ASSUME_NONNULL_BEGIN

@interface BBArrayConverter : NSObject

+ (NSData *)dataFromJSArray:(JSValue *)value inContext:(JSContext *)ctx;
+ (JSValue *)valueFromData:(NSData *)data inContext:(JSContext *)ctx;

@end

NS_ASSUME_NONNULL_END
