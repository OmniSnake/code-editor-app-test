import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class ApiService {
  public execute(language: string, code: string): Promise<{status:'success'|'error',output?:string,error?:string}> {
    return new Promise((resolve) => {
      const payload = { language, code };

      fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(() => {
        setTimeout(() => {
          const mockResponseJs = {status:'success' as const, output:'Hello, world!\n'};
          const mockResponsePy = {status:'success' as const, output:'Hello, world!\n'};
          if ((payload.language === 'javascript') && (payload.code === 'console.log(\"Hello, world!\");'))
            {
              resolve(mockResponseJs);
            } else if ((payload.language === 'python') && (payload.code === 'print(\"Hello, world!\");')) 
              {
                resolve(mockResponsePy);
              }
              else { resolve({status:'error' as const, error:'SyntaxError: Unexpected token'}); }
        }, 1000);
      })
    });
  }
}