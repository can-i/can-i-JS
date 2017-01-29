
/**
 * This shall be the universal place to store configuration.
 */
export namespace Settings {

}

export default Settings;
export namespace Settings.Application.Express.Middleware.BodyParser {


    export let ENABLE: boolean;
    export namespace URL {

        export let ENABLE: boolean;

        export namespace OPTIONS {

            export let extended: boolean;
            export let inflate: boolean;
            export let limit: number | string;
            export let parameterLimit: number;
        }

    }
    export namespace JSON {

        export let ENABLE: boolean;
        export namespace Options {

            export let inflate: boolean;
            export let limit: string | number;
            export let reviver: any;
            export let strict: boolean;
            export let type: string;
            export let verify: any;
        }
    }
    export namespace TEXT {

        export let ENABLE: boolean;
        export namespace Options {
            export let defaultCharset: string;
            export let inflate: boolean;
            export let limit: number | string;
            export let type: string;
            export let verify: any;

        }

    }
    export namespace Raw {

        export let ENABLE: boolean;
        export namespace OPTIONS {
            export let inflate: boolean;
            export let limit: number | string;
            export let type: string;
            export let verify: any;
        }
    }
}