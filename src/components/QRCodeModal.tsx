import React from 'react';
import { X, Copy, Check, QrCode, Smartphone } from 'lucide-react';
import { renderQRCodeSvg } from '../utils/qrGenerator';

interface QRCodeModalProps {
  address: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ address, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const qrSvgHtml = renderQRCodeSvg(address, 220);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-sm p-6 text-center">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Scan QR Code</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Scan this QR code with your mobile camera to quickly copy or open this temporary inbox on your phone.
        </p>

        {/* QR SVG */}
        <div className="flex justify-center my-4" dangerouslySetInnerHTML={{ __html: qrSvgHtml }} />

        <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 my-4">
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-emerald-400 select-all break-all">
            {address}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
        </button>

      </div>
    </div>
  );
};
