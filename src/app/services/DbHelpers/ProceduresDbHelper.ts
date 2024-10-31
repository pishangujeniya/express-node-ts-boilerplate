import { MySQLHelper } from '../MySQLHelper';
import { } from "promise";
import { BunyanHelper } from "../BunyanHelper";
import { DbHelperReturn, DatatableRequestModel } from '../../models/general.models';

/**
 * Every procedure of our database should be called from here.
 * So that any parameter changes and procedure response changes can be done directly inside here rather than look to into each and every database helper.
 *  ## Why single procedure db  helper? 
 *  - Its because in MySQL Procedures are also all in one folder, they are not like individual tables related like Triggers.
 */
export class ProceduresDbHelper {
    constructor() {
    }

    /**
     * returns all users
     */
    public async getUsers(dataTableRequestParams: DatatableRequestModel): Promise<DbHelperReturn> {
        let usersReturn = new DbHelperReturn();
        try {
            // let sqlQuery = "SELECT * FROM `users`";
            let sqlQuery = "CALL get_users(?, ?, ?, ?, ?, ?, @num_rows); select @num_rows as num_rows;";
            BunyanHelper.activityLogger.info(sqlQuery);

            let args = new Array();
            args.push(
                '',
                dataTableRequestParams.search.value,
                dataTableRequestParams.columns[dataTableRequestParams.order[0]["column"]]["data"],
                dataTableRequestParams.order[0]["dir"],
                dataTableRequestParams.start,
                dataTableRequestParams.length
            );
            let results = await MySQLHelper.executeQuery(sqlQuery, args);

            if (results.length > 0) {
                usersReturn.isError = false;
            }
            else {
                usersReturn.isError = true;
            }

            usersReturn.result = results;
        } catch (error) {
            BunyanHelper.errorLogger.error(error);
            console.error(error);
            usersReturn.isError = true;
            usersReturn.result = error;
        }
        return usersReturn;
    }

    public async deleteUserAndDataPemenent(user_uuid: string): Promise<DbHelperReturn> {
        let deleteUserAndDataPemenentReturn = new DbHelperReturn();

        try {
            let sqlQuery = "CALL `delete_user_and_data_permanent`('" + user_uuid + "')";

            BunyanHelper.activityLogger.info(sqlQuery);

            let results = await MySQLHelper.executeQuery(sqlQuery, [
                user_uuid
            ]);

            if (results.length > 0) {
                deleteUserAndDataPemenentReturn.isError = false;
            }
            else {
                deleteUserAndDataPemenentReturn.isError = true;
            }

            deleteUserAndDataPemenentReturn.result = results;

        }
        catch (error) {
            BunyanHelper.errorLogger.error(error);
            console.error(error);
            deleteUserAndDataPemenentReturn.isError = true;
            deleteUserAndDataPemenentReturn.result = error;
        }
        finally {
            return deleteUserAndDataPemenentReturn;
        }
    }
}



