import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name:'sort'
})
export class SortPipe implements PipeTransform{
    transform(value: any) {
        var result=[];
        var name = [];
        value.forEach(element => {
            name.push(element.name);
        });
        name=name.sort();
        name.forEach(element => {
            result.push(value.find(x=>x.name===element));
        });
        return result;
    }
    
}