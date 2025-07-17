ps aux | grep -i "code" | head -20
bash-5.2$ ps aux | grep -i "code" | head -20
owner      41016  0.0  0.1 1461583616 7452 ?     Dsl  Jul12   0:43 /usr/share/code-insiders/code-insiders .
owner      41019  0.0  0.0 34025036 2400 ?       S    Jul12   0:00 /usr/share/code-insiders/code-insiders --type=zygote --no-zygote-sandbox
owner      41020  0.0  0.0 34025024 2360 ?       S    Jul12   0:00 /usr/share/code-insiders/code-insiders --type=zygote
owner      41022  0.0  0.0 34025024 768 ?        S    Jul12   0:00 /usr/share/code-insiders/code-insiders --type=zygote
owner      41045  0.0  0.0 33575856 932 ?        Sl   Jul12   0:00 /usr/share/code-insiders/chrome_crashpad_handler --monitor-self-annotation=ptype=crashpad-handler --no-rate-limit --database=/home/owner/.config/Code - Insiders/Crashpad --url=appcenter://code-insiders?aid=a04472a4-f4ea-4854-bf12-95bb0f2dd01a&uid=58d9e5b6-7779-4b96-8515-c7e99dec7673&iid=58d9e5b6-7779-4b96-8515-c7e99dec7673&sid=58d9e5b6-7779-4b96-8515-c7e99dec7673 --annotation=_companyName=Microsoft --annotation=_productName=VSCode --annotation=_version=1.103.0-insider --annotation=lsb-release=Fedora Linux 42 (Workstation Edition) --annotation=plat=Linux --annotation=prod=Electron --annotation=ver=35.6.0 --initial-client-fd=46 --shared-client-connection
owner      41094  0.0  0.0 34347672 3304 ?       Sl   Jul12   0:13 /usr/share/code-insiders/code-insiders --type=zygote --no-zygote-sandbox
owner      41101  0.0  0.0 34082872 3156 ?       Sl   Jul12   0:12 /proc/self/exe --type=utility --utility-sub-type=network.mojom.NetworkService --lang=en-US --service-sandbox-type=none --crashpad-handler-pid=41045 --enable-crash-reporter=3a4d3286-2528-41a0-84c6-7bc43fc2d47c,no_channel --user-data-dir=/home/owner/.config/Code - Insiders --standard-schemes=vscode-webview,vscode-file --enable-sandbox --secure-schemes=vscode-webview,vscode-file --cors-schemes=vscode-webview,vscode-file --fetch-schemes=vscode-webview,vscode-file --service-worker-schemes=vscode-webview --code-cache-schemes=vscode-webview,vscode-file --shared-files=v8_context_snapshot_data:100 --field-trial-handle=3,i,18099548538197365181,4758878645853425129,262144 --enable-features=DocumentPolicyIncludeJSCallStacksInCrashReports,EarlyEstablishGpuChannel,EstablishGpuChannelAsync --disable-features=CalculateNativeWinOcclusion,SpareRendererForSitePerProcess --variations-seed-version
owner     224473  0.0  0.0 236376  1264 pts/0    Ss+  Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     225722  0.0  0.0 232572  1112 pts/6    Ss   Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     225735  0.0  0.0 232572  1048 pts/6    S    Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     225966  0.0  0.0 232576  1180 pts/7    Ss+  Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     232101  0.0  0.0 232572  1096 pts/1    Ss   Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     232112  0.0  0.0 232572   804 pts/1    S    Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     232243  0.0  0.0 232572  1084 pts/9    Ss+  Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     237202  0.0  0.0 232572   948 pts/10   Ss   Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     237213  0.0  0.0 232572   680 pts/10   S    Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     237365  0.0  0.0 232572  1200 pts/11   Ss+  Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     243486  0.0  0.0 232572  1328 pts/12   Ss   Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     243497  0.0  0.0 232572   980 pts/12   S    Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
owner     243568  0.0  0.0 232576   932 pts/13   Ss+  Jul15   0:00 /usr/bin/bash --init-file /usr/share/code/resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-bash.sh
bash-5.2$ 
bash-5.2$ pkill -f "code-insiders" && echo "Killed code-insiders processes"
Killed code-insiders processes
bash-5.2$ 
bash-5.2$ xdotool search --name "htop" getwindowpid
bash-5.2$ 
bash-5.2$ ps aux | grep htop
owner     651111  4.5  0.0 236292  4984 pts/3    R+   08:32   3:14 htop
owner     702890  0.0  0.0 231256  2352 pts/24   S+   09:44   0:00 grep htop
bash-5.2$ 
bash-5.2$ xdotool search --name "Terminal" windowactivate
XGetWindowProperty[_NET_WM_DESKTOP] failed (code=1)
bash-5.2$ 
bash-5.2$ python3 system_performance_inspector.py
python3: can't open file '/home/owner/system_performance_inspector.py': [Errno 2] No such file or directory
bash-5.2$ 
bash-5.2$ ls -la system_performance_inspector.py && python3 ./system_performance_inspector.py
ls: cannot access 'system_performance_inspector.py': No such file or directory
bash-5.2$ 
bash-5.2$ pwd && ls -la | head -10
/home/owner
total 15756
drwx------. 1 owner owner    7492 Jul 16 08:49 .
drwxr-xr-x. 1 root  root       10 May  8 20:00 ..
drwxr-x---. 1 owner owner      48 Jun  7 13:36 .android
drwxr-xr-x. 1 owner owner       0 Jun  7 14:48 android
drwxr-xr-x. 1 owner owner       0 Jun 20 07:09 android-mtp
drwxr-xr-x. 1 root  root        0 Jul 12 16:12 .augment
drwxr-xr-x. 1 owner owner     476 Jul 11 10:11 augment_backups
-rw-r--r--. 1 owner owner      94 Jun  3 23:19 .bash_aliases
-rw-------. 1 owner owner   44901 Jul 16 08:49 .bash_history
bash-5.2$ 
bash-5.2$ echo "🔍 SYSTEM PERFORMANCE ANALYSIS" && echo "================================" && echo "💻 CPU and Memory Usage:" && top -bn1 | head -5
🔍 SYSTEM PERFORMANCE ANALYSIS
================================
💻 CPU and Memory Usage:
top - 09:46:36 up 4 days, 14:15,  2 users,  load average: 2.66, 4.14, 3.62
Tasks: 368 total,   2 running, 365 sleeping,   0 stopped,   1 zombie
%Cpu(s): 63.1 us,  7.7 sy,  0.0 ni, 24.6 id,  3.1 wa,  1.5 hi,  0.0 si,  0.0 st 
MiB Mem :   5821.4 total,    237.6 free,   4964.7 used,    984.5 buff/cache     
MiB Swap:   5821.0 total,   3218.4 free,   2602.6 used.    856.8 avail Mem 
bash-5.2$ 
bash-5.2$ echo "🐷 TOP CPU CONSUMERS:" && ps aux --sort=-%cpu | head -10
🐷 TOP CPU CONSUMERS:
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
owner     509536 53.5 34.2 1461456616 2040444 ?  Rl   04:31 168:46 /usr/share/code/code --type=zygote
owner     651111  4.5  0.0 236292  5112 pts/3    S+   08:32   3:22 htop
owner     705285  4.4  0.0 235216  5164 pts/24   R+   09:46   0:00 ps aux --sort=-%cpu
owner     508523  3.8  7.1 1461465444 423760 ?   Dl   04:30  12:14 /usr/share/code/code --type=zygote
owner     508283  3.4  0.9 34430968 57440 ?      Sl   04:30  11:00 /usr/share/code/code --type=zygote --no-zygote-sandbox
owner     508639  1.9  8.2 1461391804 493040 ?   Sl   04:31   6:06 /proc/self/exe --type=utility --utility-sub-type=node.mojom.NodeService --lang=en-US --service-sandbox-type=none --dns-result-order=ipv4first --experimental-network-inspection --inspect-port=0 --crashpad-handler-pid=508263 --enable-crash-reporter=b55a57d6-69b1-4793-9c99-8d8219df3ea2,no_channel --user-data-dir=/home/owner/.config/Code --standard-schemes=vscode-webview,vscode-file --enable-sandbox --secure-schemes=vscode-webview,vscode-file --cors-schemes=vscode-webview,vscode-file --fetch-schemes=vscode-webview,vscode-file --service-worker-schemes=vscode-webview --code-cache-schemes=vscode-webview,vscode-file --shared-files=v8_context_snapshot_data:100 --field-trial-handle=3,i,12236363439091704308,8492356029608574922,262144 --enable-features=DocumentPolicyIncludeJSCallStacksInCrashReports,EarlyEstablishGpuChannel,EstablishGpuChannelAsync --disable-features=CalculateNativeWinOcclusion,SpareRendererForSitePerProcess --variations-seed-version
owner       2978  1.1  1.4 4683424 89024 ?       Ssl  Jul11  75:30 /usr/bin/gnome-shell
owner     508532  1.1  2.5 1461426336 154432 ?   Sl   04:30   3:32 /usr/share/code/code --type=zygote
owner     508237  0.8  3.1 1461645716 185892 ?   SLsl 04:30   2:39 /usr/share/code/code --verbose --disable-gpu .
bash-5.2$ 
bash-5.2$ echo "🎯 KILLING HIGH CPU VS CODE PROCESS (PID 509536)" && kill -TERM 509536 && sleep 2 && kill -KILL 509536 2>/dev/null || echo "Process terminated"
🎯 KILLING HIGH CPU VS CODE PROCESS (PID 509536)
Process terminated
bash-5.2$ 