def setUp(self):
  openApp("Google Chrome.app")
  wait("CHQ.png",20) # wait until the app appears

def tearDown(self):
  closeApp("Google Chrome.app")
  #untilNotExist("36.png") # wait until the app disappears

def testA(self):
  click("HQ.png")
  type("google.com\n")
  wait("mFIngLucky-1.png",20)
  click("1331217874117.png")
  wait("TPusPINNumbe.png")
  click("GetCurrentUr-1.png")
  
  assert exists("TPusPINNumbe-1.png")

