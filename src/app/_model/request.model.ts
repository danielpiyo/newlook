export class Request {
    category: number;
    desc: string;
    department: number;
    deport: number;
    region: number;
    token: string;
}

export class ToaAssignRequest {
    req_id: number;
    username: string;
    token: string;
}

export class ToaCloseRequest {
    req_id: number;    
    token: string;
}