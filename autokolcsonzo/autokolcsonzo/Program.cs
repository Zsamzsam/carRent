using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace autokolcsonzo
{
    internal class Program
    {
        [STAThread]
        public static void Main(string[] args)
        {
            if(args.Length > 0 && args[0] == "--stat")
            {
                Statisztika statisztika = new Statisztika();
                statisztika.cheapDailyCost();
                statisztika.expensiveDailyCost();
                statisztika.mostExpensiveDailyCost();
                statisztika.groupByBrand();
                statisztika.searchCar();
            } else
            {
                App app = new App();
                app.InitializeComponent();
                app.Run();
            }
        }
    }
}
