/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
@import Firebase;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"jog"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  NSDictionary *environment = [[NSProcessInfo processInfo] environment];
  NSString* jogEnv = environment[@"JOG_ENVIRONMENT"];
  
  NSLog(@"JOG_ENVIRONMENT is %@",jogEnv);
  
  NSBundle* bundle = [NSBundle mainBundle];
  
  FIROptions* options;
  if ([jogEnv isEqualToString:@"DEBUG"]) {
    options = [[FIROptions new] initWithContentsOfFile:[bundle pathForResource:@"GoogleService-Info.dev" ofType:@"plist"]];
  } else if ([jogEnv isEqualToString:@"RELEASE"]) {
    options = [[FIROptions new] initWithContentsOfFile:[bundle pathForResource:@"GoogleService-Info.prod" ofType:@"plist"]];
  }
  
  [FIRApp configureWithOptions:options];
  return YES;
}

@end
