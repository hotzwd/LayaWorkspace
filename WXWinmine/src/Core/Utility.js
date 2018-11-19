     /**
      * 最大列数
      */
     var MAX_COLS = 8;
     /**
      * 最大行数
      */
     var MAX_ROWS = 8;
     /**
      * 方块宽度
      */
      var SQUAREWIDTH = 84;
     
    /**
     * 获得周围停靠位置的列表nRow,nCol为要计算的停靠位置，vecPos返回它周围的位置
     */
    function GetAround(nRow, nCol, vecPos )
    {
        if (IsValidPos(nRow, nCol))
        {
            //同一行
            if (IsValidPos(nRow, nCol - 1))
            {
                vecPos.push(new Point(nRow, nCol - 1));
            }
            if (IsValidPos(nRow, nCol + 1))
            {
                vecPos.push(new Point(nRow, nCol + 1));
            }

            //下面一行
            if (IsValidPos(nRow + 1, nCol-1))
            {
                vecPos.push(new Point(nRow + 1, nCol - 1));
            }
            if (IsValidPos(nRow + 1, nCol))
            {
                vecPos.push(new Point(nRow + 1, nCol));
            }
            if (IsValidPos(nRow + 1, nCol + 1))
            {
                vecPos.push(new Point(nRow + 1, nCol + 1));
            }

            //上面一行
            if (IsValidPos(nRow - 1, nCol -1))
            {
                vecPos.push(new Point(nRow - 1, nCol -1));
            }
            if (IsValidPos(nRow - 1, nCol))
            {
                vecPos.push(new Point(nRow - 1, nCol));
            }
            if (IsValidPos(nRow - 1, nCol +1))
            {
                vecPos.push(new Point(nRow - 1, nCol+1));
            }
        }


    }

    /**
     *一个位置是否有效的位置
     */
    function IsValidPos(nRow, nCol )
    {
        var t_isValid = true;
        if (nRow < 0 || nCol < 0)
        {
            t_isValid = false;
        }
        if (nRow >= MAX_ROWS || nCol >= MAX_COLS)
        {
            t_isValid = false;
        }
        return t_isValid;
    }