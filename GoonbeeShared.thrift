//
//  GoonbeeSharedThriftService.thrift
//  Goonbee Thrift Shared
//
//  Created by Luka Mirosevic on 17/04/2014.
//  Copyright (c) 2014 Goonbee. All rights reserved.
//

namespace js GBShared
namespace cocoa GBShared

enum ResponseStatus {
    SUCCESS =               0,
    GENERIC =               1,
    MALFORMED_REQUEST =     2,
    AUTHENTICATION =        3,
    AUTHORIZATION =         4,
    PHASED_OUT =            5,
}

enum Direction {
    FORWARDS =              0,
    BACKWARDS =             1,
}

struct Range {
    1: Direction direction,
    2: i32 index,
    3: i32 length,
}

exception RequestError {
    1: ResponseStatus status,
    2: optional string message,
}

service BaseService {
	/**
	 * Check whether the service is alive or not. If so it should return the magic string "777"
	 */
	string alive() throws(1: GoonbeeShared.RequestError error),
}
