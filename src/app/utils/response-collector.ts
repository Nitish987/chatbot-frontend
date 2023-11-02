export class ResponseCollector {
    response: any;
  
    constructor(response: any) {
      this.response = response;
    }
  
    success = (): boolean => this.response['success'];
  
    data = (): any => this.response['data'];
  
    error = (): string => {
      const errors = this.response['errors'];
      return errors[Object.keys(errors)[0]][0];
    }
  
    static localErrorResponse(error: string = "Something went wrong."): ResponseCollector {
      return new ResponseCollector({
        success: false,
        data: {},
        errors: {
          client: [error]
        }
      });
    }
  }