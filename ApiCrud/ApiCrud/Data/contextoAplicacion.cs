using ApiCrud.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCrud.Data
{
    public class contextoAplicacion: DbContext
    {
        public contextoAplicacion(DbContextOptions<contextoAplicacion> options) : base(options)
        {

        }

        public  DbSet<PersonaTB> PersonasTB { get; set; }

    }
}
