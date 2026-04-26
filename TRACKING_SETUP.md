# Guía de Configuración - Meta Pixel + Google Tag Manager

## ✅ LO QUE YA ESTÁ HECHO

El código de tracking ya está integrado en el sitio. Solo falta obtener los IDs y agregarlos a las variables de entorno.

### Eventos que ya están trackeados:

**Meta Pixel:**
- `PageView` - Cada vez que alguien visita una página
- `ViewContent` - Cuando alguien ve un tour (scroll hasta verlo)
- `InitiateCheckout` - Cuando alguien hace click en "Reservar"
- `Contact` - Cuando alguien hace click en WhatsApp
- `Lead` - Cuando alguien envía un formulario

**Google Tag Manager:**
- `page_view` - Vistas de página
- `tour_view` - Cuando un tour entra en viewport
- `whatsapp_click` - Clicks en WhatsApp
- `booking_start` - Inicio de proceso de reserva
- `cta_click` - Clicks en botones CTA

---

## 🎯 PASO 1: CREAR META PIXEL

### 1.1 Ir a Facebook Business Manager

**URL:** https://business.facebook.com

**Pasos:**
1. Ir a **Configuración de la empresa** (ícono engranaje arriba derecha)
2. En el menú izquierdo, buscar **Orígenes de datos** → **Píxeles**
3. Click en **Agregar** → **Crear un píxel**
4. Nombre: `Cenotes Kin-Ha`
5. **Copiar el Pixel ID** (un número como `123456789012345`)

### 1.2 Guardar el Pixel ID

```env
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

---

## 📊 PASO 2: CREAR GOOGLE TAG MANAGER

### 2.1 Ir a Google Tag Manager

**URL:** https://tagmanager.google.com

**Pasos:**
1. Click en **Crear cuenta**
2. Nombre de la cuenta: `Cenotes Kin-Ha`
3. País: México
4. Nombre del contenedor: `cenotekinha.com`
5. Plataforma de destino: **Web**
6. Click **Crear**
7. Aceptar términos de servicio

### 2.2 Copiar el GTM ID

Después de crear la cuenta, verás un código que empieza con:

```
GTM-XXXXXXX
```

**Copiar solo el ID:** `GTM-XXXXXXX`

### 2.3 Guardar el GTM ID

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## 🔧 PASO 3: CONFIGURAR VARIABLES DE ENTORNO

### 3.1 Crear archivo .env.local

En la raíz del proyecto, crear archivo `.env.local`:

```bash
# Analytics - Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Analytics - Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 3.2 Agregar a Cloudflare Pages

**En Cloudflare Dashboard:**

1. Ir a **Workers & Pages** → **cenotekinha**
2. Click en **Settings** → **Environment variables**
3. Agregar cada variable:
   - Name: `NEXT_PUBLIC_META_PIXEL_ID`
   - Value: `123456789012345`
   - Click **Save**
4. Repetir para `NEXT_PUBLIC_GTM_ID`
5. **Redeploy** el sitio para que tome las nuevas variables

---

## 📈 PASO 4: VERIFICAR QUE FUNCIONE

### 4.1 Verificar Meta Pixel

**Instalar extensión:**
- Chrome: [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper)

**Verificar:**
1. Visitar https://cenotekinha.com
2. Abrir la extensión Meta Pixel Helper
3. Debe mostrar: ✅ Pixel activo con tu ID
4. Eventos que deberías ver:
   - `PageView` - al cargar la página
   - `ViewContent` - al hacer scroll a los tours
   - `Contact` - al hacer click en WhatsApp

### 4.2 Verificar Google Tag Manager

**Usando Google Tag Assistant:**
- Chrome: [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g)

**O verificar en consola:**
1. Visitar https://cenotekinha.com
2. Abrir DevTools (F12)
3. En Console escribir: `dataLayer`
4. Debe mostrar array con eventos

---

## 🎬 PASO 5: CONFIGURAR CONVERSIONES EN META ADS

### 5.1 Crear eventos personalizados (opcional)

**En Facebook Events Manager:**
1. Ir a https://business.facebook.com/events_manager2
2. Seleccionar tu píxel
3. Ir a **Eventos personalizados**
4. Crear evento personalizado:
   - Nombre: `Reserva WhatsApp`
   - Condición: URL contiene `wa.me`
   - **O** Evento estándar: `Contact`

### 5.2 Crear audiencias para retargeting

**Audiencias recomendadas:**
1. **Visitantes del sitio (últimos 30 días)**
2. **Vieron un tour pero no reservaron**
3. **Hicieron click en WhatsApp**

---

## 📊 PASO 6: CONFIGURAR TAGS EN GTM (OPCIONAL - AVANZADO)

Si quieres enviar eventos de GTM a Google Analytics:

1. En GTM, crear **Tag** → **Google Analytics 4**
2. Measurement ID: `G-XXXXXXXXXX` (de tu cuenta GA4)
3. Trigger: All Pages
4. Guardar y **Publish**

---

## ✅ CHECKLIST FINAL

- [ ] Meta Pixel ID obtenido y configurado
- [ ] GTM ID obtenido y configurado
- [ ] Variables agregadas a `.env.local`
- [ ] Variables agregadas a Cloudflare Pages
- [ ] Sitio redeployado
- [ ] Verificado con Meta Pixel Helper
- [ ] Verificado que `dataLayer` existe en consola
- [ ] Probado click en WhatsApp (debe disparar evento)
- [ ] Probado scroll a tours (debe disparar ViewContent)

---

## 🚀 RESULTADO

Con esto configurado, ya puedes:

✅ Ver tráfico en tiempo real en Meta Events Manager  
✅ Crear campañas de retargeting en Meta Ads  
✅ Ver conversiones (reservas por WhatsApp)  
✅ Trackear ROI de tus campañas publicitarias  
✅ Crear audiencias similares (Lookalike) de tus mejores clientes  

**PRÓXIMO PASO:** Activar campaña de retargeting en Meta Ads mostrando los tours a quienes visitaron el sitio pero no reservaron.

---

## 💡 TIPS

- **Meta Pixel tarda 15-20 min en activarse** después de agregar el ID
- **GTM es instantáneo** una vez deployed
- **Usa el modo DEBUG de GTM** para ver eventos en tiempo real durante setup
- **No compartas públicamente** los IDs de producción (pero no son súper sensibles)

---

**¿Dudas?** Contacta a Luis o revisa:
- Meta Pixel: https://www.facebook.com/business/help/952192354843755
- GTM: https://support.google.com/tagmanager
