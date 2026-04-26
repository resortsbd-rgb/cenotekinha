# ✅ Meta Pixel + Google Tag Manager - IMPLEMENTADO

## 📦 LO QUE SE HIZO (30 MIN)

### Archivos creados:
1. **`src/components/Analytics.tsx`**
   - Componente que carga Meta Pixel y GTM
   - Auto-trackea PageView en cada cambio de ruta
   - Funciona sin configuración (modo development) hasta que agregues los IDs

2. **`src/lib/analytics.ts`**
   - Funciones helper para trackear eventos específicos:
     - `trackBookingStart()` - Inicio de reserva
     - `trackBookingComplete()` - Compra completada (para cuando Stripe esté activo)
     - `trackWhatsAppClick()` - Clicks en WhatsApp
     - `trackTourView()` - Cuando un tour entra en viewport
     - `trackFormSubmit()` - Envío de formularios
     - `trackCTAClick()` - Clicks en CTAs

3. **`TRACKING_SETUP.md`**
   - Guía paso a paso para obtener Meta Pixel ID
   - Guía paso a paso para obtener GTM ID
   - Instrucciones de verificación
   - Checklist completo

4. **`.env.example`**
   - Template de variables de entorno necesarias
   - Incluye Meta Pixel, GTM, Stripe (para futuro)

### Archivos modificados:
1. **`src/app/layout.tsx`**
   - Agregado componente `<Analytics />` global
   - Se carga en todas las páginas automáticamente

2. **`src/components/ui/WhatsAppButton.tsx`**
   - Agregado tracking de clicks
   - Evento: `Contact` (Meta) + `whatsapp_click` (GTM)

3. **`src/components/ui/ToursSection.tsx`**
   - Agregado Intersection Observer para detectar cuando un tour se ve
   - Evento: `ViewContent` (Meta) + `tour_view` (GTM)
   - Tracking de clicks en botón "Reservar"

---

## 🎯 EVENTOS QUE YA ESTÁN TRACKEADOS

### Meta Pixel (Facebook Ads):
✅ `PageView` - Cada vista de página  
✅ `ViewContent` - Cuando alguien ve un tour  
✅ `InitiateCheckout` - Click en "Reservar"  
✅ `Contact` - Click en WhatsApp  
✅ `Lead` - Envío de formularios (cuando estén listos)  
✅ `Purchase` - Compra completada (cuando Stripe esté activo)

### Google Tag Manager:
✅ `page_view` - Vista de página  
✅ `tour_view` - Tour visto  
✅ `whatsapp_click` - Click WhatsApp  
✅ `booking_start` - Inicio de reserva  
✅ `cta_click` - Clicks en CTAs  
✅ `form_submit` - Envío de formularios

---

## 🚀 PRÓXIMOS PASOS

### PASO 1: Push a GitHub (TÚ)

```bash
cd [ruta-del-proyecto-cenotekinha]
git pull origin master  # Por si acaso
git push origin master  # Push del commit que acabamos de hacer
```

Esto automáticamente deploya a Cloudflare Pages en ~60 segundos.

### PASO 2: Obtener IDs (FRANCISCO + TÚ)

**Lee el archivo:** `TRACKING_SETUP.md`

Necesitan:
1. **Meta Pixel ID** (de Facebook Business Manager)
2. **GTM ID** (de Google Tag Manager)

**Tiempo estimado:** 15 minutos en total

### PASO 3: Configurar Variables de Entorno

**En Cloudflare Pages:**

1. Ir a: https://dash.cloudflare.com
2. **Workers & Pages** → **cenotekinha** → **Settings** → **Environment variables**
3. Agregar:
   ```
   NEXT_PUBLIC_META_PIXEL_ID = [el ID que obtuvieron]
   NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX
   ```
4. **Redeploy** el sitio (botón en Deployments)

**En desarrollo local (.env.local):**

```env
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### PASO 4: Verificar

**Instalar extensiones Chrome:**
- [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper)
- [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g)

**Visitar:** https://cenotekinha.com

**Verificar:**
- ✅ Meta Pixel Helper muestra tu píxel activo
- ✅ Ver eventos `PageView`, `ViewContent` al hacer scroll
- ✅ Ver evento `Contact` al click en WhatsApp
- ✅ En DevTools Console: escribir `dataLayer` debe mostrar array con eventos

---

## 💡 BENEFICIOS INMEDIATOS

Una vez configurado, puedes:

✅ **Ver tráfico en tiempo real** en Facebook Events Manager  
✅ **Crear audiencias de retargeting**:
   - Visitaron el sitio pero no reservaron
   - Vieron un tour específico
   - Hicieron click en WhatsApp pero no completaron

✅ **Optimizar campañas Meta Ads**:
   - Conversion tracking automático
   - Lookalike audiences de tus mejores clientes
   - A/B testing de creativos con data real

✅ **Medir ROI exacto**:
   - Cuánto gastaste en ads → cuántas reservas generaste
   - Costo por reserva (CPR)
   - ROAS (Return On Ad Spend)

---

## 📊 EJEMPLO DE USO: CAMPAÑA RETARGETING

**Escenario:**  
100 personas visitaron cenotekinha.com, vieron "Experiencia Completa" ($1,200 MXN), pero no reservaron.

**Con este tracking configurado:**

1. En Meta Ads Manager → Audiencias → Crear audiencia personalizada
2. **Fuente:** Píxel de tu sitio web
3. **Eventos:** ViewContent (Tour = Experiencia Completa) en últimos 7 días
4. **PERO NO:** Contact (no hicieron click en WhatsApp)
5. Crear campaña mostrando:
   - Carousel de fotos del tour
   - Descuento 10% si reservan esta semana
   - "Vimos que te interesó..."

**Resultado esperado:**  
- CTR 3-5% (vs 0.5-1% cold traffic)
- CPC $0.50-1.50 USD (vs $3-5 USD cold)
- Conversión 15-25% (vs 2-5% cold)

**Si 25 de esos 100 convierten:**
- Revenue: 25 × $1,200 = $30,000 MXN
- Ad spend: ~$30-50 USD (~$600-1,000 MXN)
- ROI: 3,000%+

---

## ⚡ READY TO DEPLOY

El código está listo. Solo falta:

1. ✅ Hacer `git push` (tú)
2. ⏳ Obtener Meta Pixel ID + GTM ID (Francisco + tú, 15 min)
3. ⏳ Agregar IDs a Cloudflare (3 min)
4. ✅ Verificar con extensiones Chrome (2 min)

**TOTAL TIME TO LIVE:** ~20 minutos después del push

---

## 🎓 RECURSOS

- **Guía completa setup:** `TRACKING_SETUP.md` (en el repo)
- **Variables de entorno:** `.env.example` (template)
- **Meta Pixel docs:** https://www.facebook.com/business/help/952192354843755
- **GTM docs:** https://support.google.com/tagmanager

---

**¿DUDAS?** Revisa `TRACKING_SETUP.md` o avísame.

**SIGUIENTE IMPLEMENTACIÓN:** Landing Tours Privados (1-2 hrs)
