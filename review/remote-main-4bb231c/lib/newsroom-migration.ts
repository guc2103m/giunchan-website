import {newsroomEntries} from '@/lib/content-data';

export const newsroomInventory={
  checkedAt:'2026-09-06',
  legacyPageCount:2,
  legacyPostCount:15,
  spreadsheetArticleRecords:59,
  spreadsheetBroadcastRecords:10,
  confirmedDuplicateEventGroups:8,
  exactDuplicateUrlGroups:1,
  coreMigratedCount:15,
  archiveOnlyCount:0,
  heldCount:0,
  omittedCount:0,
} as const;

export const newsroomMigrationRows=newsroomEntries.map((entry,index)=>({
  number:index+1,
  legacyPostId:entry.legacyPostId!,
  originalTitle:entry.originalTitle,
  publisher:entry.publisher!,
  publishedAt:entry.publishedAt,
  newTitle:entry.title,
  category:entry.category,
  researchStage:entry.researchStage||'해당 없음',
  newUrl:`/newsroom/${entry.slug}`,
  legacyUrl:entry.legacyUrl!,
  originalArticleUrl:entry.originalArticleUrl!,
  migrationStatus:entry.migrationStatus!,
}));
