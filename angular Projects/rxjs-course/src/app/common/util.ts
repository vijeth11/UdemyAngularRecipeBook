import { Observable } from "rxjs";


export function createHttpObservable(url:string){
    const http$ = Observable.create(observer => {
      const controller = new AbortController();
      const signal = controller.signal;

      fetch(url,{signal:signal})
      .then(response => {
        if(response.ok){
          return response.json();
        }
        else{
          observer.error('Request has failed');
        }
      })
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err))

      return () => controller.abort();
    })
    return http$;
  }