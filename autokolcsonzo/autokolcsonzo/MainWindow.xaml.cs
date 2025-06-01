using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace autokolcsonzo
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Statisztika statisztika;
        public MainWindow()
        {
            InitializeComponent();
            try
            {
                this.statisztika = new Statisztika();
                dGrid.ItemsSource = statisztika.cars;
            }catch (Exception e) 
            {
                MessageBox.Show(e.Message, "Adatbázis hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Application.Current.Shutdown();
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var selected = dGrid.SelectedItem as Car;
            if( selected == null)
            {
                MessageBox.Show("A törléshez előbb válasszon ki autót");
                return;
            }

            var result = MessageBox.Show("Biztosan szeretné törölni a kiválasztott autót?", "Megerősítés", MessageBoxButton.YesNo);

            if( result == MessageBoxResult.Yes)
            {
                bool success = statisztika.delete(selected);
                if(success == true)
                {
                    MessageBox.Show("Az autó törlése sikeres volt");
                    statisztika.cars.Remove(selected);
                    dGrid.Items.Refresh();
                } else
                {
                    MessageBox.Show("Az autó törlése sikertelen volt!");
                }
            }
        }
    }
}