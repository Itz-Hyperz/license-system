:: This file was made by anusO1#6969
@echo off
color 0a
echo License System
echo 1. Start
echo 2. Install
echo Select one: 
set /p selection=
if %selection% == 1 goto start
if %selection% == 2 goto install
:start
echo Starting app...
start powershell -noexit -command "node main.js"
:install
echo Installing stuff...
npm i
