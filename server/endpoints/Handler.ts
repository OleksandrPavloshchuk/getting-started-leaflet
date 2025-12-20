/**
 * Common endpoint handler with errors processing
 */

import {Request, Response} from "express";

export type EndpointHandler = (req: Request, res: Response) => void;