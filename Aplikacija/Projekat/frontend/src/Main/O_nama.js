import classes from "./O_nama.module.css";
const O_nama = () => {
    return(
        <div className={classes.mainPart}>
          <div><h1 className={classes.h1Part}>O nama</h1></div>
          <div>
          <p>Pronađite svog proverenog čoveka sa sela.</p>
          <p>Mi smo prva platforma koja okuplja sve male proizvođače hrane iz Srbije na jednom mestu.</p> 
          </div>
          <h1 className={classes.h1Part}>O platformi</h1>
          <p>FoodHouse je platforma koja prikuplja informacije o gazdinstvima, farmama, zadrugama i omogućava kupcima da svoje utiske prenesu i drugima, i tako prošire dobru reč. Želimo da za sve vas pronađemo „proverenog čoveka sa sela“, preko koga ćete moći da dođete do svojih zdravih namirnica.</p>
      
          <p>Mali proizvođači su uglavnom porodice koje zajedničkim snagama, od najstarijih do najmlađih članova, svoje vreme provode u zemljoradnji, gajenju životinja, kao i obradi dobijenih namirnica u gotove proizvode. Oni ulažu mnogo energije, napora, ljubavi i borbe da bi bili konkurentni i da bi dostavili plodove svog rada nama, krajnjim korisnicima.</p>
      
          <p>Podržimo ih tako što ćemo kupiti njihove proizvode, isprobati ih, i ako smo u njima uživali – javno ih pohvaliti i na taj način preporučiti ostalima.</p>

          <h1 className={classes.h1Part}>Zašto je važno podržati male proizvođače?</h1>
          <h2 className={classes.h2Part}>Ekonomija</h2>
          <p>Doprinosimo boljem prometu malih proizvođača, kojima svaka porudžbina znači unapređenje poslovanja, plaćene račune i sit stomak (mnogo više nego sitan profit supermarketu).</p>
          <h2 className={classes.h2Part}>Ekologija</h2>
          <p>Kupujemo namirnice koje su proizvedene na organski način i pakovane u ekološku ambalažu. Podržavamo humane uslove u proizvodnji mesa, mleka i jaja, jer možemo da biramo gazdinstva i farme koji brinu o životinjama.</p>
          <h2 className={classes.h2Part}>Kvalitet</h2>
          <p>Pripremamo hranu koja jeste prava hrana, a ne jedinjenje svakojakih sastojaka. Kupovinom sezonskih namirnica izbegavamo njihovo intenzivno tretiranje hemijom i bezličan ukus.</p>
          <h2 className={classes.h2Part}>Očuvanje tradicije</h2>
          <p>Tradicionalna lokalna hrana izumire svuda u svetu – kupovinom proizvoda napravljenih po starim recepturama pomažemo njeno očuvanje.</p>
      </div>
    )
};

export default O_nama;