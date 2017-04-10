#!/usr/bin/env bash

cd android && \
./gradlew clean && \
# Generate unsigned APK
./gradlew assembleRelease && \
# Clean up prior builds
rm -f app/build/outputs/apk/app-release-unsigned-aligned.apk && \
# Generate aligned, unsigned APK
zipalign -v -p 4 app/build/outputs/apk/app-release-unsigned.apk app/build/outputs/apk/app-release-unsigned-aligned.apk && \
# Generate signed APK
apksigner sign --ks fastlane.jks --out app/app-release.apk app/build/outputs/apk/app-release-unsigned-aligned.apk && \
# Upload meta data and APK
fastlane supply --apk app/app-release.apk --track alpha --json_key fastlane-privatekey.json --package_name insure.jog
