@echo off
echo QQ  push bat

del  qqwanyiwan\code.js

copy qqPlayCore.js qqwanyiwan\layaforqq
copy GameConfig.js qqwanyiwan\js

cd qqwanyiwan

adb push . /sdcard/tencent/MobileQQ/.apollo/game/5774

rem pause
