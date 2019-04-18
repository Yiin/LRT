import * as fs from 'fs';
import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'axios',
          useFactory: () => ({
            get: () => ({
              data: fs
                .readFileSync(
                  path.join(__dirname, './__mock_data/lrt-televizija.html'),
                )
                .toString(),
            }),
          }),
        },
        AppService,
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('live-tv', () => {
    it('should return correct data', async () => {
      const currentTvShows = await appService.getCurrentTvShows();
      const dataToValidate = currentTvShows.map(({ logo, ...rest }) => ({
        ...rest,
      }));

      expect(dataToValidate).toEqual([
        {
          key: 0,
          title: 'Specialus tyrimas',
          time: '19.30 - 20.25',
          progress: '95%',
          link: '/mediateka/tiesiogiai/lrt-televizija',
        },
        {
          key: 1,
          title: 'Kultūros diena',
          time: '20.10 - 20.30',
          progress: '61%',
          link: '/mediateka/tiesiogiai/lrt-plius',
        },
        {
          key: 2,
          title: 'Specialus tyrimas',
          time: '19.30 - 20.30',
          progress: '87%',
          link: '/mediateka/tiesiogiai/lrt-lituanica',
        },
        {
          key: 3,
          title: 'Gera girdėti.',
          time: '20.20 - 20.45',
          progress: '9%',
          link: '/mediateka/tiesiogiai/lrt-radijas',
        },
        {
          key: 4,
          title:
            'Lietuvos koncertų salėse. Koncerto „Septyni žodžiai“ įrašas iš NF. Dalyvauja Lietuvos kamerinis orkestras, Nacionalinio muzikos forumo choras (Vroclavas, Lenkija) ir Marta Niedźwiecka (vargonai, Lenkija). Dirigentas Andrzej Kosendiak (Lenkija). Programoje Johanno Sebastiano Bacho, Henry‘o Purcello, Pawelo Mykietyno, Wojciecho Kilaro ir Jameso MacMillano kūriniai.',
          time: '19.00 - 21.00',
          progress: '68%',
          link: '/mediateka/tiesiogiai/lrt-klasika',
        },
        {
          key: 5,
          title: 'LRT OPUS muzika.',
          time: '20.00 - 21.00',
          progress: '37%',
          link: '/mediateka/tiesiogiai/lrt-opus',
        },
      ]);
    });
  });
});
