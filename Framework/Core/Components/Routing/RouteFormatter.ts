export function RouteFormatter(route_path: string) {
    route_path = `/${route_path}`.replace(/\/+/, "/").replace(/\/+$/, "");
    return route_path ? route_path : "/"
}

export default RouteFormatter;