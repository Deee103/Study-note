## InternalAxiosConfig 与 AxiosConfig 不兼容问题
#InternalAxiosConfig
![{7D470D68-06A1-4CB2-81C9-77B2F5A82416}.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250603182416470.png)
``requestSuccessFn`` 封装中``config`` 与返回类型更新为``InternalAxiosRequestConfig``而非``AixosRequestConfig``
![{8EDA60D4-A28B-47A4-A2BB-EF5BF50BE4A3}.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250604002647210.png)
或者在``type.ts`` 中HYRequest接口中加入``headers:AxiosRequestHeaders``
