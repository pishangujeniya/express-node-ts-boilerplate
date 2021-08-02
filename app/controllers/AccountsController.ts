import { CustomResponse } from '../models/GeneralModels';
import { SignUpRequestModel } from '../models/AccountsModels';
import { AccountsDbHelper } from '../helpers/DbHelpers/AccountsDbHelper';
import { BunyanHelper } from '../helpers/BunyanHelper';

export class AccountsController {
    private accountDbHelper: AccountsDbHelper;

    constructor() {
        this.accountDbHelper = new AccountsDbHelper();
    }

    public async signUpUser(req: SignUpRequestModel): Promise<CustomResponse> {
        var customResponse = new CustomResponse();
        try {

            var insertUserResult = await this.accountDbHelper.insertUser(
                req.first_name,
                req.last_name,
                req.email_id,
                req.mobile_number,
                req.password);

            if (insertUserResult.isError) {
                customResponse.error_code = 500;
                customResponse.error_messages = insertUserResult.result instanceof Array ? 'Failed to Sign Up' : insertUserResult.result;
                customResponse.result = false;
            } else {
                // Successfully inserted the user row
                customResponse.error_code = 200;
                customResponse.result = true;
            }

        } catch (error) {
            BunyanHelper.errorLogger.error(error);
            console.error(error);
            customResponse.error_code = 500;
            customResponse.error_messages = "Something went wrong";
            customResponse.result = error;
        } finally {
            return customResponse;
        }
    }
}
