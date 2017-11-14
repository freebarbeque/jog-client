import {Action} from "redux";

export interface IAction extends Action {
    [key: string]: any;
}