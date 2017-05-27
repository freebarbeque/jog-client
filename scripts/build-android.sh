#!/usr/bin/env bash

export ENVFILE=".env.release"

cd android && \
./gradlew clean && \
# Generate unsigned APK
./gradlew assembleRelease && \
# Clean up prior builds
rm -f app/build/outputs/apk/app-release-unsigned-aligned.apk && \
# Generate aligned, unsigned APK
zipalign -v -p 4 app/build/outputs/apk/app-release-unsigned.apk app/build/outputs/apk/app-release-unsigned-aligned.apk && \
# Generate signed APK
apksigner sign --ks my-release-key.jks --out app/app-release.apk app/build/outputs/apk/app-release-unsigned-aligned.apk
