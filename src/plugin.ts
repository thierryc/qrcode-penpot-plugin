import type { PluginMessageEvent, PluginUIEvent } from './model.ts';


penpot.ui.open('QRcode', `?theme=${penpot.theme}`, {
    width: 292,
    height: 540,
});


penpot.ui.onMessage<PluginUIEvent>((message) => {
    if (message.type === 'insert-svg') {
        const { name, svg } = message.content;

        if (!svg || !name) {
            return;
        }

        const qrCode = penpot.createShapeFromSvg(svg);
        if (qrCode) {
            qrCode.name = name;
            qrCode.x = penpot.viewport.center.x;
            qrCode.y = penpot.viewport.center.y;
        }
    }
});

penpot.on('themechange', (theme) => {
    sendMessage({ type: 'theme', content: theme });
});

function sendMessage(message: PluginMessageEvent) {
    penpot.ui.sendMessage(message);
}