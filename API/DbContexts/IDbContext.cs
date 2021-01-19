using System;
using Microsoft.EntityFrameworkCore;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public interface IDbContext: IDisposable
    {
        DbContext Instance { get; }

        bool IsSQLServer{ get; set; }
    }
}
