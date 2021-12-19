# balena-ikea-vindriktning
A balena application for "sniffing" IKEA vindriktning readings from its internal MCU testpads

![20211219_024417](https://user-images.githubusercontent.com/2338223/146661877-2d85e8ae-82fe-46ab-b8d5-11085ea2a66a.jpg)

## What
The [IKEA VINDRIKTNING](ikea.com/us/en/p/vindriktning-air-quality-sensor-60515911/) is an affordable infrared PM2.5 air quality sensor. It has an embedded MCU that performs serial reads every 2 seconds and outputs the data in the form of a 3 stage RGB LED strip:

* ![#00ff00](https://via.placeholder.com/15/00ff00/000000?text=+) `GREEN` = 0-30 μg/m³
* ![#ffff00](https://via.placeholder.com/15/ffff00/000000?text=+) `YELLOW` = 30-100 μg/m³
* ![#ff0000](https://via.placeholder.com/15/ff0000/000000?text=+) `RED` = 100+ μg/m³

## Why
The design of this device is very hacker/tinker friendly: 

* The case and the internal MCU PCB uses only standard phillips head screws (albeit tiny, I believe those are self-tapping, 2mm diameter) without any glue or seals.
* The actual sensor is connected via 2 JST plugs to the MCU PCB and the pcb has intuitive silkscreen that helps figuring it out. 
* The MCU PCB has testpads for power and serial, so it is pretty easy to hook up. 
* Since the MCU already performs reads, the only required action in order to have a reading is sit on those testpads and "sniff" the TX pin for serial communication between the MCU and the sensor.
* __In a time when attention to air quality and ventilation should be very high, having cheap,widely/globally available and easy to hack platform to work on, is very valuable.__

## How

1. On the rear side of the device there are 4 phillips head screws to remove (you will need a decently long shaft screwdiver to access them)
2. Once the 4 screws are removed, the front and rear parts can be gently pulled to reveal the interior. You can either slide off the whole fan+sensor module or disconnect the 2 JST plugs from the PCB (the latter is suggested since we will be soldering 3 cables to the MCU PCB testpads)
3. Remove the 3 phillips head screws from the MCU PCB and slide it out of the front lid (this is suggested to make sure the soldering doesn't accidentally melt or damage the fron lid)
4. Cut off one end from 3 jumper jerky cables so that the opposite end is a female connector ( ![#ff0000](https://via.placeholder.com/15/ff0000/000000?text=+) RED for 5V, ![#000000](https://via.placeholder.com/15/000000/000000?text=+) BLACK for GND and a ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) color of your choice for TX is suggested) and solder them to the right testpads on the MCU PCB :

![20211219_023958](https://user-images.githubusercontent.com/2338223/146662017-4a929e2f-c2af-44c8-ad31-32920f8cc48b.jpg)

6. Slide the 3 jerky cables through the rpi0 ring adapter, close the rear and front case parts with the 4 phillips head screws on the rear
7. Cut the other end of the ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) TX cable and solder it to one of the High Voltage pins of the logic lever shifter. Then solder to the corresponding Low Voltage pin a same-color jumper jerky cable so that the opposite end is a female connector
8. Cut the other end of the ![#000000](https://via.placeholder.com/15/000000/000000?text=+) GND cable and solder it to one of the High Voltage GND pin of the logic lever shifter. Then solder to the corresponding Low Voltage GND pin a same-color jumper jerky cable so that the opposite end is a female connector

![20211219_024340](https://user-images.githubusercontent.com/2338223/146662115-afcb78f6-d835-47eb-8c23-06c1971dcadb.jpg)

10. Mount a rpi0/rpi0w/rpi0-2 and hook the ![#ff0000](https://via.placeholder.com/15/ff0000/000000?text=+) RED one to [PIN #2](https://pinout.xyz/pinout/5v_power), ![#000000](https://via.placeholder.com/15/000000/000000?text=+) BLACK one to [PIN #6](https://pinout.xyz/pinout/ground), ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) COLOR one to [PIN #10](https://pinout.xyz/pinout/pin10_gpio15)

![20211219_024244](https://user-images.githubusercontent.com/2338223/146662032-303c675f-6135-4ca0-a75f-7a3017edafe9.jpg)

9. Use the rpi0/rpi0w/rpi0-2 power input to power the whole assembly.
10. Deploy this application
11. [WIP] Get readings at the device local IP address or public URL
