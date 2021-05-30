import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(context) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = context.renderPage;

        try {
            context.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (properties) =>
                        sheet.collectStyles(<App {...properties} />),
                });

            const initialProperties = await Document.getInitialProps(context);
            return {
                ...initialProperties,
                styles: (
                    <>
                        {initialProperties.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}