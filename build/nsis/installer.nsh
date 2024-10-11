
!macro customHeader
   RequestExecutionLevel admin
!macroend

; 自定义宏，安装时注入 伪协议
!macro customInstall
  # DeleteRegKey HKCR "anime-box"
  WriteRegStr HKCR "anime-box" "" "URL:anime-box"
  WriteRegStr HKCR "anime-box" "URL Protocol" ""
  WriteRegStr HKCR "anime-box\shell" "" ""
  WriteRegStr HKCR "anime-box\shell\Open" "" ""
  WriteRegStr HKCR "anime-box\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

; 删除程序宏
!macro customUnInstall
  DeleteRegKey HKCR "anime-box"
!macroend

!macro customInstallMode
  # set $isForceMachineInstall or $isForceCurrentInstall
  # to enforce one or the other modes.
!macroend

!macro customWelcomePage
  # Welcome Page is not added by default for installer.
  !insertMacro MUI_PAGE_WELCOME
!macroend


; [Function方法]
; 逻辑：假如勾选了自动启动，则在软件的同级目录下创建一个文件
; 生成一个文件check_ini.json
; 打开时，检查是否需要自动启动
;
; !macro AddAutoBoot
; Function AddAutoBoot
;   FileOpen $9 $INSTDIR\setting_ini.json w
;   FileWrite $9 '{"auto_start": true}'
;
;   FileClose $9
;   SetFileAttributes $INSTDIR\setting_ini.json NORMAL
;   WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "anime-box" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
; FunctionEnd
; !macroend

!macro AddAutoBoot
Function AddAutoBoot
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "anime-box" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
FunctionEnd
!macroend




; [注入 - 自定义安装包装完的界面]
!macro customFinishPage
  ; 1、选项：立即运行
  ; !define MUI_FINISHPAGE_RUN "$INSTDIR\anime-box.exe"
  ; !define MUI_FINISHPAGE_RUN_TEXT "运行 anime-box"

  ; 2、选项：开机时自动运行
  !define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\anime-box.exe"
  !define MUI_FINISHPAGE_SHOWREADME_FUNCTION AddAutoBoot
  !define MUI_FINISHPAGE_SHOWREADME_TEXT "开机时自动运行shadow-ai"
  ; !define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED

  ; 重点（因为宏覆盖掉了原来的流程，所以需要在这里初始化界面）
  !insertmacro MUI_PAGE_FINISH
  ; 追加刚才定义的Function 紧跟在这段代码后面
  !insertmacro AddAutoBoot
!macroend
