import './FloatingWhatsApp.css'

const WHATSAPP_NUMBER = '918939474747'
const WHATSAPP_DISPLAY = '+91 89 39 47 47 47'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      id="floating-whatsapp-btn"
      aria-label={`Chat with us on WhatsApp: ${WHATSAPP_DISPLAY}`}
    >
      {/* Pulse ring */}
      <span className="floating-whatsapp-ring" aria-hidden="true" />

      {/* WhatsApp icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="floating-whatsapp-icon">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.96 6.96c0 1.527.42 3.022 1.21 4.32l-1.288 4.705 4.806-1.268c1.261.737 2.707 1.126 4.232 1.126h.004a6.966 6.966 0 006.96-6.96c0-1.86-.727-3.61-2.045-4.927a6.963 6.963 0 00-4.915-2.038M21.75 11.997A10.751 10.751 0 0011.032 1.25h-.008a10.75 10.75 0 00-10.75 10.75c0 2.373.577 4.686 1.673 6.73l-1.78 6.497 6.654-1.756a10.732 10.732 0 005.155 1.308h.008c5.933 0 10.75-4.817 10.75-10.75" />
      </svg>

      {/* Tooltip */}
      <span className="floating-whatsapp-tooltip" aria-hidden="true">
        <span className="floating-whatsapp-tooltip-title">Chat on WhatsApp</span>
        <span className="floating-whatsapp-tooltip-number">{WHATSAPP_DISPLAY}</span>
      </span>
    </a>
  )
}
