#!/usr/bin/env bash

# upload metadata to iTunes connect
fastlane deliver --username richardjog@z-dev.io --force && \
cd ios && \
# build IPA
ipa build --scheme "Jog Release" && \
# upload IPA to iTunes connect & release
fastlane pilot upload --username richardjog@z-dev.io --skip_waiting_for_build_processing && \
cd -
