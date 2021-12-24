# balena-ikea-vindriktning
A balena application for "sniffing" IKEA VINDRIKTNING readings from its internal MCU testpads

![image](https://user-images.githubusercontent.com/2338223/147313288-e4ef057c-9a1e-4643-a7ee-15b5d9d1bbdf.png)

## What
The [IKEA VINDRIKTNING](ikea.com/us/en/p/vindriktning-air-quality-sensor-60515911/) is an affordable infrared PM2.5 air quality sensor. It has an embedded MCU that performs serial reads over 5V logic every 2 seconds and outputs the data in the form of a 3 stage RGB LED strip:

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

### BoM

| QTY | Name | Notes |
|---|---|---|
| 1 | IKEA VINDRIKTNING | link defaults to US - browse your local country IKEA website! |
| 5 | Jumper jerky cable | I used 5 from this set: https://shop.pimoroni.com/products/jumper-jerky?variant=348491271 |
| 1 | Raspberry Pi zero / zero W / zero 2 |  |
| 1 | 8GB+ uSD card |  |
| 4 | 2mm x 4mm self tapping screws | I used screws from this set: https://www.amazon.com/dp/B08YDP9DBF/ |
| 1 | 3.3V to 5V logic level shifter | needs to be SERIAL/I2C/SPI safe, such as https://www.adafruit.com/product/757 |
| 1 | 3d-printed lid for Raspberry Pi zero / zero W / zero 2 | https://github.com/balena-io-playground/balena-ikea-vindriktning/blob/master/ikea_sensor_rpi_lid.stl |

### Instructions

1. On the rear side of the device there are 4 phillips head screws to remove (you will need a decently long shaft screwdiver to access them)
2. Once the 4 screws are removed, the front and rear parts can be gently pulled to reveal the interior. You can either slide off the whole fan+sensor module or disconnect the 2 JST plugs from the PCB (the latter is suggested since we will be soldering 3 cables to the MCU PCB testpads)

![20211219_023905](https://user-images.githubusercontent.com/2338223/146662948-8405a5e5-0c9c-4823-b3bf-f39b96991f64.jpg)

4. Remove the 3 phillips head screws from the MCU PCB and slide it out of the front lid
5. Cut off one end from 3 jumper jerky cables so that the opposite end is a female connector ( ![#ff0000](https://via.placeholder.com/15/ff0000/000000?text=+) RED for 5V, ![#000000](https://via.placeholder.com/15/000000/000000?text=+) BLACK for GND and a ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) color of your choice for TX is suggested) and solder them to the right testpads on the MCU PCB :

![20211219_023958](https://user-images.githubusercontent.com/2338223/146662017-4a929e2f-c2af-44c8-ad31-32920f8cc48b.jpg)

6. Cut the other end of the ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) TX cable and solder it to one of the High Voltage pins of the logic lever shifter. Then solder to the corresponding Low Voltage pin a same-color jumper jerky cable so that the opposite end is a female connector
7. Cut the other end of the ![#000000](https://via.placeholder.com/15/000000/000000?text=+) GND cable and solder it to one of the High Voltage GND pin of the logic lever shifter. Then solder to the corresponding Low Voltage GND pin a same-color jumper jerky cable so that the opposite end is a female connector

![20211219_024340](https://user-images.githubusercontent.com/2338223/146662115-afcb78f6-d835-47eb-8c23-06c1971dcadb.jpg)

8. Secure the MCU in the 3d printed lid (compared to the picture below, your MCU will have the 3 floating cables attached)

![image](https://user-images.githubusercontent.com/2338223/147313902-57a75c21-29ce-40f7-9daf-047594190f0f.png)

9. Mount a rpi0/rpi0w/rpi0-2 and hook the ![#ff0000](https://via.placeholder.com/15/ff0000/000000?text=+) RED cable (5V) to [PIN #2](https://pinout.xyz/pinout/5v_power), ![#000000](https://via.placeholder.com/15/000000/000000?text=+) BLACK cable (GND) to [PIN #6](https://pinout.xyz/pinout/ground), ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) COLOR cable (TX 3V3 shifted) to [PIN #10](https://pinout.xyz/pinout/pin10_gpio15)

10. Slide the logic lever shifter and the floating cables aside the Raspberry Pi zero / zero W / zero 2
11. Close the rear and front case parts and secure them with the 4 phillips head screws on the rear
12. Use the rpi0/rpi0w/rpi0-2 power input to power the whole assembly.
13. Deploy this application
14. [WIP] Get readings at the device local IP address or public URL

## Progress

- [x] investigate the sensor internals and ways to tap in and read data
- [x] Implement a simple MVP hardware-wise
- [x] Design and test a small adapter that allows a Raspberry Pi Zero/Zero W/Zero 2 device to be mounted
- [x] Make sure data reading is working
- [ ] Decode/parse data
- [ ] Expose an interface for accessing the data
- [x] Re-design the adapter so that it encloses and protects the Raspberry Pi Zero/Zero W/Zero 2, the logic level converter and the floating jumper jerky cables
