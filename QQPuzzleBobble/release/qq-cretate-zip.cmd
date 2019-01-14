@echo off
echo QQ  bat

rem copy index.html fb-instant-games\

rem cd fb-instant-games

rem rd /s/q libs
rem rd /s/q js

rem cd ..
del  cmshow_game_5774.zip

echo !!!!! Go on Create Zip !!!!!
pause

set str_time_first_bit="%time:~0,1%"  
if %str_time_first_bit%==" " (  
    set str_date_time=%date:~0,4%%date:~5,2%%date:~8,2%_0%time:~1,1%%time:~3,2%%time:~6,2%
)else (   
    set str_date_time=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
)  
rem set zipName=%str_date_time%.zip
set zipName= cmshow_game_5774.zip
echo %zipName%  

WinRAR a -r %zipName% qqwanyiwan\*

rem pause
