If window 10: download the 8gadgetpack from http://8gadgetpack.net/ then proceed

locate the gadget folder under your local disk running your OS:
*change your Users name*
C:\Users\Brad\AppData\Local\Microsoft\Windows Sidebar\Gadgets

copy the Uspace.gadget folder in github to this directory

right click on the desk top, and click gadgets

find the Uspace gadget and enable it (I put a placeholder icon)

gadgets are coded using html, css, js, and xml files.

Our deliverables:
creating a settings panel: https://msdn.microsoft.com/en-us/library/windows/desktop/bb655904(v=vs.85).aspx
uses some flyout.js, gadget.js, and then the corresponding flyout.html + flyout.css to make the menu

for cpu information, use the All_CPU_Meter.gadget file in the gadget pack as an example

not sure on how to change the background from the settings UI/js files it should be possible though.

**NOTE** I recommend all of us using the github desktop app so that we can make local repositories 
within the gadget folder. Will make synchronization easier. We also need to rename the repository 
to Uspace.gadget since this is the filename that windows gadget recognizes.