import { mailInt } from '@typings/mail';

export const BrowserMailData: mailInt[] = [
  {
    mailid: 2,
    sender: "Eduardo",
    subject: "Delivery Location",
    message: "Here is all info about the delivery, <br><br>Items: <br> 1x Weed Brick<br><br> Be on time!!",
    read: 0,
    date: 'Tue Mar 08 2022 23:01:37 GMT+0000 (Greenwich Mean Time)',
    button: {
      buttonEvent: "qb-drugs:client:setLocation",
      enabled: true,
      buttonData: {
        dealer: "Eduardo",
        itemData: {
          minrep: 0,
          item: "weed_brick"
        },
        amount: 2,
        locationLabel: "DR Kush",
        coords: {
          x: -1151.9300537109375,
          y: -1447.5899658203125,
          z: 4.71000003814697
        }
      }
    },
  },
  {
    mailid: 1,
    sender: "Billing Department",
    subject: "Invoice Paid",
    message: "Invoice Has Been Paid From Sienna Dunlap In The Amount Of $425",
    read: 1,
    date: 'Tue Mar 08 2022 23:01:37 GMT+0000 (Greenwich Mean Time)'
  },

];

