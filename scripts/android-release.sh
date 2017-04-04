#!/usr/bin/env bash

cd android &&
./gradlew assembleRelease &&
rm -f app/build/outputs/apk/app-release-unsigned-aligned.apk &&
zipalign -v -p 4 app/build/outputs/apk/app-release-unsigned.apk app/build/outputs/apk/app-release-unsigned-aligned.apk &&
apksigner sign --ks ${JOG_KEY_STORE} --out app/app-release.apk app/build/outputs/apk/app-release-unsigned-aligned.apk
