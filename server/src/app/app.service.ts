import { Injectable, Inject } from '@nestjs/common';
import Axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrentShow } from './app.interface';

@Injectable()
export class AppService {
  constructor(@Inject('axios') private axios: typeof Axios) {}

  private findCurrentShows(html): CurrentShow[] {
    const $ = cheerio.load(html);

    const nodes = $('#tvprog .live-program');

    return nodes.toArray().map((node, key) => ({
      key,
      logo: $(node)
        .find('.logo__svg')
        .toString(),
      title: $(node)
        .find('.channel-item__title')
        .text(),
      time: $(node)
        .find('.data-block__text')
        .text(),
      progress: $(node)
        .find('.live-program__progress')
        .css('width'),
      link: $(node)
        .find('.channel-item__link')
        .attr('href'),
    }));
  }

  async getCurrentTvShows(): Promise<CurrentShow[]> | null {
    try {
      const response = await this.axios.get(
        'https://www.lrt.lt/mediateka/tiesiogiai/lrt-televizija',
      );

      return this.findCurrentShows(response.data);
    } catch (e) {
      return null;
    }
  }
}
