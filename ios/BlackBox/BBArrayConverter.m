//
//  BBArrayConverter.m
//  BlackBox
//
//  Created by Jack Flintermann on 2/24/19.
//  Copyright © 2019 Jack. All rights reserved.
//

#import "BBArrayConverter.h"

@implementation BBArrayConverter

// adapted from https://github.com/phoboslab/Ejecta/commit/e013db3e1bb1151f3c6393985538307f40d8e84a

+ (NSData *)dataFromJSArray:(JSValue *)value inContext:(JSContext *)ctx {
    size_t length = 0;
    void *data = JSValueGetTypedArrayPtr(ctx.JSGlobalContextRef, value.JSValueRef, &length);
    return [NSData dataWithBytes:data length:length];
}

+ (JSValue *)valueFromData:(NSData *)data inContext:(JSContext *)ctx {
    JSContextRef ctxRef = ctx.JSGlobalContextRef;
    JSObjectRef array = JSObjectMakeTypedArray(ctxRef, kJSTypedArrayTypeUint8Array, data.length, NULL);
    memcpy(JSObjectGetTypedArrayBytesPtr(ctxRef, array, NULL), data.bytes, data.length);
    JSObjectRef ref = JSObjectGetTypedArrayBuffer(ctxRef, array, NULL);
    return [JSValue valueWithJSValueRef:ref inContext:ctx];
}

// Shorthand to get the data ptr and length from a TypedArray or ArrayBuffer
void *JSValueGetTypedArrayPtr(JSContextRef ctx, JSValueRef value, size_t *length ) {
    JSTypedArrayType type = JSValueGetTypedArrayType(ctx, value, NULL);
    
    // Array Buffer
    if (type == kJSTypedArrayTypeArrayBuffer) {
        if (length != NULL) {
            *length = JSObjectGetArrayBufferByteLength(ctx, (JSObjectRef)value, NULL);
        }
        return JSObjectGetArrayBufferBytesPtr(ctx, (JSObjectRef)value, NULL);
    }
    
    // Typed Array
    else if (type != kJSTypedArrayTypeNone) {
        if (length != NULL) {
            *length = JSObjectGetTypedArrayByteLength(ctx, (JSObjectRef)value, NULL);
        }
        return JSObjectGetTypedArrayBytesPtr(ctx, (JSObjectRef)value, NULL);
    }
    
    if (length != NULL) {
        *length = 0;
    }
    
    return NULL;
}

@end
