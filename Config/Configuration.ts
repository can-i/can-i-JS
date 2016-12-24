export interface Configuration {
    features: string[]
    controllers: string
    services: string
    views: string
    engine:Partial<Engine>
}


export interface Engine {

    extension: string
    engineName: string
    engineConfig: any

}