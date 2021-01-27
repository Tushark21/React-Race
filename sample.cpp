#include <stdio.h>
int main()
{
    int m,n;
    scanf("%d%d",&m,&n);
    int arr[m][n];
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            scanf("%d",&arr[i][j]);
        }
    }
    int c=0;int col=0;int sum=0;
    for (int i=0;i<1;i++){
        for(int j=0;j<n;j++){
            if(arr[i][j]>c) {c=arr[i][j];col=j;}
        }
    }
    sum+=c;
    for(int i=1;i<m;i++){
        int start,end;
        if(col==0){start=0;end=1;}
        else if(col==m-1){start=col-1;end=col;}
        else {start=col-1;end=col+1;}
        
        int prev=0;
        for(int j=start;j<=end;j++){
            if(arr[i][j]>prev){prev=arr[i][j];col=j;}
        }
        sum+=prev;
    }
    printf("%d",sum);
    return 0;
}