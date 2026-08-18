# Cuadernillo S1 — problemas (participante)

Código: ____________    Fecha: ____________

Trabaje en silencio. Puede dejar un problema y volver. No es un examen de un curso.

---

## 1. El almuerzo

Un comedor prepara: arroz, frijoles, ensalada, casado y jugo.

- El casado necesita arroz y frijoles ya listos.
- El jugo puede hacerse en cualquier momento.
- La ensalada debe estar lista antes del casado.
- Solo hay un fogón: arroz y frijoles no pueden cocinarse al mismo tiempo. Cada uno tarda 1 turno en el fogón.
- Ensalada, jugo y armar el casado tardan 1 turno y no usan fogón.

¿Cuál es el mínimo de turnos para tener casado y jugo listos? Escriba también un orden posible.

---

## 2. El mapa

En la hoja anexa hay un mapa con muchos nombres. Solo importan Casa, Puente, Mercado y Campus. Las demás etiquetas no cambian las rutas.

Calles cerradas: Casa–Mercado y Puente–Campus.

Indique una ruta de Casa a Campus que no use calles cerradas. ¿Cuántos tramos útiles tiene, como mínimo?

---

## 3. La cooperativa

Hay que llevar tres bultos — alfa, beta y gamma — del depósito al barrio.

- La camioneta carga como máximo 2 bultos.
- Puede volver vacía.
- Empieza en el depósito.
- Cada tramo (ida o vuelta) cuenta 1 viaje.
- Alfa no comparte viaje con beta.
- Cuando gamma llega al barrio, alfa ya está ahí o llega en el mismo viaje.

¿Mínimo de viajes? Escriba el plan.

---

## 4. El procedimiento

Se afirma que este procedimiento **invierte** una lista. Con `[a, b, c]` no produce `[c, b, a]`.

```
1  n ← longitud(lista)
2  i ← 0
3  mientras i < n
4      lista[i] ← lista[n - i]
5      i ← i + 1
6  devolver lista
```

(1) ¿Qué línea falla?  
(2) ¿Por qué?  
(3) Corrija una línea o agregue una.

---

## 5. Los sellos

Una serie de sellos: círculo, cuadrado, círculo, cuadrado, círculo, ¿?

¿Cuál es el sexto?

Ahora cada sello tiene además un punto en el centro. Una serie de siete empezó en círculo. ¿Qué forma tiene el séptimo? ¿El punto cambia la regla?

---

## 6. La mesa

Cinco sillas en fila. Personas: Ana, Ben, Cata, Dino, Eva.

- Ana no queda junto a Dino.
- Cata en un extremo (primera o última silla).
- Ben queda inmediatamente a la izquierda de Eva.

Arreglo propuesto: Cata, Ben, Eva, Ana, Dino.

¿Qué regla se rompe? Escriba un arreglo que cumpla las tres.
