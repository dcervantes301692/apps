Contraseñas
Mac: DesarrolloBlen
IPAD: 123456
developer@blen.com.mx
password: Blen#018

Compliar en Android
1)cd documents
2)keytool -genkey -v -keystore Blen.keystore -alias blenapps -keyalg RSA -keysize 2048 -validity 10000
Introduzca la contraseña del almacén de claves:Blen.2016
Volver a escribir la contraseña nueva:Blen.2016
¿Cuáles son su nombre y su apellido?
  [Unknown]:  Blen
¿Cuál es el nombre de su unidad de organización?
  [Unknown]:  Blen
¿Cuál es el nombre de su organización?
  [Unknown]:  Blen
¿Cuál es el nombre de su ciudad o localidad?
  [Unknown]:  Guadalajara
¿Cuál es el nombre de su estado o provincia?
  [Unknown]:  Jalisco
¿Cuál es el código de país de dos letras de la unidad?
  [Unknown]:  44160
¿Es correcto CN=Blen, OU=Blen, O=Blen, L=Guadalajara, ST=Jalisco, C=44160?
  [no]:  s

Generando par de claves RSA de 2,048 bits para certificado autofirmado (SHA256withRSA) con una validez de 10,000 días
        para: CN=Blen, OU=Blen, O=Blen, L=Guadalajara, ST=Jalisco, C=44160
Introduzca la contraseña de clave para <blenapps>
        (INTRO si es la misma contraseña que la del almacén de claves): Blen.2016
Volver a escribir la contraseña nueva: Blen.2016
[Almacenando Blen.keystore]
3)Archivo generado se movera ala ruta C:\ionic\apps\keystore\
4)cd C:\Program Files\Java\jdk1.8.0_161\bin
5)jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\ionic\apps\keystore\Blen.keystore C:\ionic\apps\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk blenapps
6)cd C:\Android\sdk\build-tools\25.0.2
7)zipalign -v 4 C:\ionic\apps\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk BlenMovil.apk
8)jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\ionic\apps\keystore\Blen.keystore C:\ionic\apps\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk blenapps
Enter Passphrase for keystore:Blen.2016