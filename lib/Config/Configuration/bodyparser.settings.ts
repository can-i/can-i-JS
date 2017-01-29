import Settings from '../Settings';



let BodyParser = Settings.Application.Express.Middleware.BodyParser;



/**
 * BODYPARSER enabled by default
 */
BodyParser.ENABLE = true;


/**
 * JSON Settings
 */
const JSON = BodyParser.JSON;
    JSON.ENABLE = true;
    JSON.Options.strict = true;

    /*
    limited to only 200kb of json string. 
    This is double the default express amount. This is alot
    */
    JSON.Options.limit = "200kb";


/**
 * URL Settings
 */

const URL = BodyParser.URL;
    URL.ENABLE = true;
    URL.OPTIONS.extended = true;

/**
 * Text Settings
 */

const TEXT = BodyParser.TEXT;
    TEXT.ENABLE = true;



