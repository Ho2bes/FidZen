import 'package:flutter/material.dart';
import 'package:onesignal_flutter/onesignal_flutter.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initOneSignal();
  runApp(const MyApp());
}

Future<void> initOneSignal() async {
  // Initialisation de OneSignal avec le niveau de journalisation
  OneSignal.shared.setLogLevel(OSLogLevel.verbose, OSLogLevel.none);

  // Définit l'ID de l'application OneSignal
  OneSignal.shared.setAppId("daebd622-1385-4cbb-ac6a-0242eb4615b7");

  // Demande l'autorisation pour les notifications push
  OneSignal.shared.promptUserForPushNotificationPermission().then((accepted) {
    print("Permission acceptée : $accepted");
  });

  // Gestion de l'affichage des notifications au premier plan
  OneSignal.shared.setNotificationWillShowInForegroundHandler(
      (OSNotificationReceivedEvent event) {
    // Utiliser `complete` pour terminer l'affichage
    event.complete(event.notification);
  });

  // Gestion de l'ouverture des notifications
  OneSignal.shared.setNotificationOpenedHandler(
      (OSNotificationOpenedResult result) {
    print('Notification ouverte : ${result.notification.title}');
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OneSignal Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'OneSignal Integration'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() async {
    setState(() {
      _counter++;
    });

    // Récupère l'état de l'appareil pour obtenir le playerId
    var status = await OneSignal.shared.getDeviceState();
    String? playerId = status?.userId;

    if (playerId != null && playerId.isNotEmpty) {
      // Crée et envoie une notification
      var notification = OSCreateNotification(
        playerIds: [playerId],
        content: 'Bouton pressé $_counter fois',
      );
      await OneSignal.shared.postNotification(notification);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Vous avez appuyé sur le bouton autant de fois :'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Incrémenter',
        child: const Icon(Icons.add),
      ),
    );
  }
}
