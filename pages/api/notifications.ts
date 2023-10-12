import notifier from 'node-notifier';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(400);
    console.log('Wrong code!');
    return;
  }

  if (!req.body) {
    res.status(400);
    console.log('No data sent!');
    return;
  }

  notifier.notify(
    {
      title: req.body.headerSubject,
      message: req.body.text,
      icon: '/logo.png', // Absolute path (doesn't work on balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: false, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    },
    function (err: any, response: any, metadata: any) {
      // Response is response from notification
      // Metadata contains activationType, activationAt, deliveredAt
      console.log(err, response, metadata);
    }
  );

  notifier.on(
    'click',
    function (notifierObject: any, options: any, event: any) {
      // Triggers if `wait: true` and user clicks notification
      console.log(notifierObject, options, event);
    }
  );

  notifier.on('timeout', function (notifierObject: any, options: any) {
    // Triggers if `wait: true` and notification closes
    console.log(notifierObject, options);
  });
  res.status(200);
}
