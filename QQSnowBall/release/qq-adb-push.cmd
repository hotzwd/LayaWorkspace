@echo off
echo QQ  push bat

copy qqPlayerCore.js qqwanyiwan\layaforqq

cd qqwanyiwan

adb push . /sdcard/tencent/MobileQQ/.apollo/game/5639

rem pause
